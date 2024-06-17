import krest from '../icons/krest.svg';

const ElementWithButtKrest = (props) => {
  return (
    <div className="text-sm elementWithButtonKrest">
      <span className="">{props.propsName}</span>
      <button onClick={props.propsDelete}>
        <img
          height={10}
          width={10}
          loading="lazy"
          src={krest}
          className="aspect-[0.96] fill-black"
        />
      </button>
    </div>
  );
};
export default ElementWithButtKrest;
