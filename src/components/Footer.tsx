import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#F9F8F8] bg-no-repeat h-[392px] pt-4 mt-24">
      <section className="flex justify-end mr-40 gap-[150px]">
        <ul className="flex flex-col gap-[30px]">
          <a
            href="https://github.com/JesacaLin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.2rem] leading-[0.6rem] no-underline text-black tracking-[0.36px] hover:font-bold hover:no-underline hover:tracking-normal hover:cursor-pointer"
          >
            // GITHUB
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="text-[1.2rem] leading-[0.6rem] no-underline text-black tracking-[0.36px] hover:font-bold hover:no-underline hover:tracking-normal hover:cursor-pointer"
          >
            // PORTFOLIO
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="text-[1.2rem] leading-[0.6rem] no-underline text-black tracking-[0.36px] hover:font-bold hover:no-underline hover:tracking-normal hover:cursor-pointer"
          >
            // CONTACT
          </a>
        </ul>
      </section>

      <div className="py-28 px-12 pt-28">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img src="/img/footer-icon.svg" className="px-12" alt="yellow logo" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
