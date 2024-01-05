import moment from "moment";
import { blogProps } from "../types/types";
import { instance } from "../api/axios.api";

interface TodoProps extends blogProps {
  visible: boolean;
  setTodo: (prev: blogProps[]) => void;
  todo: blogProps[];
  getTodo: () => void;
}

export const TodoItem = ({
  createdAt,
  id,
  status,
  title,
  setTodo,
  todo,
  hidden,
  getTodo,
}: TodoProps) => {
  const complated = (id: number) => {
    const newArray: blogProps[] = todo?.map((c) => {
      return c.id == id ? { ...c, hidden: true } : { ...c };
    });
    setTodo(newArray);
  };
  const MouseLeave = (id: number) => {
    setTimeout(() => {
      const newArray: blogProps[] = todo?.map((c) => {
        return c.id == id && !c.position
          ? { ...c, hidden: false, position: false }
          : { ...c };
      });
      setTodo(newArray);
    }, 1500);
  };
  const complatedCard = (id: number) => {
    const newArray: blogProps[] = todo?.map((c) => {
      return c.id == id ? { ...c, position: true, hidden: true } : { ...c };
    });
    setTodo(newArray);
  };

  const complatedTasks = async (id: number) => {
    try {
      await instance.get(`/completeTask/${id}`);
      getTodo();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      {!status && (
        <div className="border-2 border-slate-500 w-[30%] flex flex-col bg-slate-300">
          <div className="flex justify-between items-center">
            <div className="w-[78%] p-1">
              <p className="text-black font-semibold">
                {moment(createdAt).format("DD.MM.YYYY")}
              </p>
            </div>
            <div className="w-[2px] bg-slate-500 h-[36px]"></div>
            <div className="w-[20%] flex justify-center p-1 relative">
              <p
                className="text-black font-semibold cursor-pointer"
                role={"button"}
                onMouseEnter={() => complated(id)}
                
              >
                В архиве
              </p>
              {hidden && (
                <div
                onMouseLeave={() => MouseLeave(id)}

                  onMouseEnter={() => complatedCard(id)}
                  className="absolute top-0 right-[-100px] bg-slate-300  flex flex-col border-slate-500 border-2"
                >
                  <p className="text-black font-semibold cursor-pointer p-2">
                    В архиве
                  </p>
                  <p className="h-[2px] w-full bg-slate-500"></p>
                  <p
                    className="text-black font-semibold cursor-pointer p-2"
                    role="button"
                    onClick={() => complatedTasks(id)}
                  >
                    Готово
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="h-[2px] w-full bg-slate-500"></div>
          <p className="text-black font-medium p-3">{title}</p>
        </div>
      )}
      {status && (
        <div className="border-2 border-slate-500 w-[30%] flex flex-col bg-white">
          <div className="flex justify-between items-center">
            <div className="w-[78%] p-1">
              <p className="text-black font-semibold">
                {moment(createdAt).format("DD.MM.YYYY")}
              </p>
            </div>
            {/* <div className="w-[2px] bg-orange-400 h-[36px]"></div> */}
            <div className="w-[20%] flex justify-center border-2 border-orange-500 p-[6px] bg-orange-300">
              <p className="text-black font-semibold">Готово</p>
            </div>
          </div>
          <div className="h-[2px] w-full bg-slate-500"></div>
          <p className="text-black font-medium p-3">{title}</p>
        </div>
      )}
    </div>
  );
};
