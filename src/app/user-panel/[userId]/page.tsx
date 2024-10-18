

export default async function DashboardPage({ params }: { params: { userId: string} }) {
    

  return (
   <div>
     <div>
            <div className="flex flex-row ">
                <div className="bg-gray-500 w-32 h-32 text-center rounded-full p-12 my-1 mx-3 ">
                    Logo
                </div>
                <div className="flex flex-wrap flex-col">
                    <div>
                        <h1 className="font-bold text-3xl mx-5 my-2">User</h1>
                    </div>
                    <div className="mx-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, quod.
                    </div>
                </div>
            </div>

            <div className="flex flex-row mx-4 my-7">
                <div className="flex flex-wrap flex-col">
                    <h3 className="font-bold text-xl">Stats</h3>
                    <div className="border-black border-2 rounded p-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, saepe.
                    </div>
                </div>
                <div className="flex flex-wrap flex-col mx-5">
                    <h3 className="font-bold text-xl">About</h3>
                    <div className="mx-7">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corrupti perferendis placeat quam quae, nulla, impedit, tenetur eum maxime dolorem blanditiis consequatur vitae doloribus deleniti. Magnam quaerat est expedita officia ut.
                    </div>
                </div>
            </div>
   </div>
   </div>
  );
}
