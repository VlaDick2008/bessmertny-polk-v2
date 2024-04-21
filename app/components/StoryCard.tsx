export default function StoryCard({
  firstName,
  secondName,
  lastName,
  photo,
}: {
  firstName: string;
  secondName: string;
  lastName: string;
  photo: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center border border-slate-300 p-3 rounded">
      <div className="md:w-[150px] md:h-[200px] h-[120px] w-[90px]">
        <img src={photo} alt="" className="object-cover w-full h-full" />
      </div>
      <p className="text-center md:text-2xl text-sm border-t border-slate-300 mt-3">
        {firstName}
        <br /> {secondName}
        <br /> {lastName}
      </p>
    </div>
  );
}
