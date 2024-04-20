export default function StoryCard({
  firstName,
  secondName,
  lastName,
  photo,
  id,
}: {
  firstName: string;
  secondName: string;
  lastName: string;
  photo: string;
  id: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center border border-slate-300 p-3 rounded">
      <div className="w-[150px] h-[200px]">
        <img src={photo} alt="" className="object-cover w-full h-full" />
      </div>
      <p className="text-center text-2xl border-t border-slate-300 mt-3">
        {firstName}
        <br /> {secondName}
        <br /> {lastName}
      </p>
    </div>
  );
}
