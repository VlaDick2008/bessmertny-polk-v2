export default function StoryCard() {
  return (
    <div className="flex flex-col items-center justify-center border border-slate-300 p-3 rounded">
      <div className="w-[150px] h-[200px]">
        <img
          src="https://cdn.guff.com/site_0/media/32000/31972/items/a94fa3365236f632b41467e1.jpg"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-center text-2xl border-t border-slate-300 mt-3">
        Жмышенко
        <br /> Альберт
        <br /> Анатольевич
      </p>
    </div>
  );
}
