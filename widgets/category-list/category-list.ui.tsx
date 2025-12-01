import { categoryQueries } from '~entities/category';

const categories = [
    {id:0, name:"Программирование"},
    {id:1, name:"Дизайн"},
    {id:3, name:"Архитектура"},
    {id:4, name:"Саморазвитие"},
    {id:5, name:"Менеджмент"}
]
export function CategoryList() {
  
  return (
    <div className='w-[95%]'>
      <h2>Категории</h2>
      <div className="flex flex-wrap gap-2 w-[95%]">
        {categories.map((category) => (
          <div
            className="border text-base font-normal p-2 rounded duration-150 hover:scale-105 hover:cursor-pointer hover:bg-second-100 hover:text-[white]  "
            key={category.id}
          >
            {category.name}
          </div>
          
        ))}
      </div>
    </div>
  );
}
