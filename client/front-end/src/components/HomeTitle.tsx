import Food from '../assets/HomePicture.svg';

function Navbar() {
  return(
    <>
      <div className="w-full flex mx-[4rem]">
        <div className="w-[50%] mt-[8rem]">
            <div className="text-dark text-[3rem] font-bold drop-shadow-md">
                Memasak Menjadi Lebih Mudah dan Praktis: Tentukan Menu Masakan Hari Ini
            </div>  
            <div className="text-gray-4 mt-4">
                Berbagai resep unik berada di tanganmu. Dari yang paling simpel sampai selevel restoran bintang lima
            </div>
            <button className="w-[15rem] h-[4rem] text-[1rem] font-bold bg-orange hover:bg-light_orange text-light rounded-[1rem] mt-[4rem]">
                Cari Resep Sekarang
            </button>
        </div>
        <div className="w-[50%]">
            <img src={Food} className="w-full"></img>
        </div>
      </div>
    </>
    )
}

export default Navbar