import * as React from "react";
import { useState } from "react";

function CriteriaCard(props) {
  return (
    <div className="flex gap-2.5 mt-5 max-md:flex-wrap max-md:max-w-full">
      <div className="flex-1 justify-center items-start p-4 text-base leading-6 whitespace-nowrap bg-gray-100 rounded-xl text-slate-500 max-md:pr-5 max-md:max-w-full">
        {props.item.name}
      </div>
      <div className="flex justify-center items-center px-3.5 w-14 h-14 bg-gray-100 rounded-xl">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c23adc78217a94444c5183979d69d64279102220acf0389828fbda3bf2e0c47f?apiKey=d356808278d742219dce7d95e695ad7e&"
          alt=""
          className="aspect-[0.96] fill-black w-[23px]"
        />
      </div>
    </div>
  );
}

function ListAdd(props) {
  const[items, setItems]=useState([]);

  React.useEffect(()=>{
    (props.itemsProps)? setItems(props.itemsProps): setItems([])
  },[])

  return (
    <main className="flex flex-col max-w-[733px]">
      <header className="items-start pt-4 pr-4 pb-2 pl-10 w-full text-base tracking-tight leading-6 text-neutral-900 max-md:px-5 max-md:max-w-full">
        {props.nameProps}
      </header>
      <section className="flex flex-col justify-center pt-4 pr-4 pb-2 pl-10 w-full max-md:pl-5 max-md:max-w-full">
        {items?.map((item) => (
          <CriteriaCard key={item.id} item={item} />
        ))}
      </section>
      <aside className="flex flex-col items-start pt-2 pr-4 pl-10 w-full text-sm font-bold tracking-wide leading-5 text-neutral-900 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col justify-center px-4 py-2.5 max-w-full bg-gray-100 rounded-xl w-[201px]">
          <div className="flex flex-col justify-center w-full bg-gray-100">
            <button type="button" className="flex gap-3">
              <img
                loading="lazy"
                height='10px'
                width='10px'
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c86a6c69fa204ded43da33ec42f3ce413aa855d2a0c1c881fa0e3a382c581286?apiKey=d356808278d742219dce7d95e695ad7e&"
                alt=""
                className="shrink-0 my-auto aspect-square w-[15px]"
              />
              <div>Добавить критерий</div>
            </button>
          </div>
        </div>
      </aside>
    </main>
  );
}

export {ListAdd};