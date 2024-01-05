import { useEffect, useState } from "react";
import { instance } from "../api/axios.api";
import { blogProps } from "../types/types";
import { TodoItem } from "../components/TodoItem";
import toast from "react-hot-toast";

export const Home = () => {
  const [todo, setTodo] = useState<blogProps[]>();
  const [title, setTitle] = useState("");
  const getTodo = async () => {
    const { data } = await instance.get<blogProps[]>("/getTasks");
    console.log(data);
    setTodo(data);
  };

  useEffect(() => {
    getTodo();
  }, []);

  const createTask = async () => {
    try {
      await instance.post("/addTask", { title, status: false });
      toast.success("Задание успешно добавлено!");
      setTitle("")
      getTodo();
    } catch (error) {
      console.log(error);
      toast.error("Эта задача уже существует");
    }
  };

  return (
    <div className="w-full h-screen p-4">
      <div className="border-2 border-black w-full h-[99%] mb-4 flex items-center flex-col justify-start overflow-y-auto">
        <h3 className="text-black text-4xl font-bold mt-[5%] mb-8">TODO</h3>
        {todo?.length == 0 && (
          <div className="my-8 gap-y-4 flex flex-col">
            <span className="font-semibold text-xl font-roboto text-black">
              Список задач пуст
            </span>
          </div>
        )}
        <div className="w-full flex flex-col gap-y-6 h-[60%] overflow-y-auto">
          {todo?.map((c) => (
            <TodoItem
              createdAt={c.createdAt}
              id={c.id}
              status={c.status}
              title={c.title}
              updatedAt={c.updatedAt}
              visible={false}
              setTodo={setTodo}
              todo={todo}
              hidden={c?.hidden}
              position={c?.position}
              getTodo={getTodo}
            />
          ))}
        </div>
        <div className="border-2 border-slate-500 w-[30%] mt-6 flex flex-col bg-slate-300">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={
              "h-[80px] placeholder:text-xl text-black p-2 text-xl placeholder:text-slate-600 outline-none resize-none"
            }
            placeholder="Текстария для ввода текста задачи"
          ></textarea>
        </div>
        <div className="flex justify-start items-start w-[30%]">
          <button onClick={createTask} className="bg-blue-300  border-slate-600 border-2 text-xl font-medium mt-4 text-black py-3 px-8">
            Добавить задачу
          </button>
        </div>
      </div>
    </div>
  );
};
