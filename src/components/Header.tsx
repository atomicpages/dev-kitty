import { useNavigate } from "react-router";

interface HeaderProps {
  isEdit?: boolean;
}

function Header({ isEdit = false }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="px-12">
      <header>
        {isEdit ? (
          <nav className="flex justify-between py-8 pb-16">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <img
                src="/img/footer-icon.svg"
                className="px-12"
                alt="yellow logo"
              />
            </a>
            <a
              href="https://github.com/JesacaLin/dev-kitty.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/Github@2x.svg" alt="Github logo" />
            </a>
          </nav>
        ) : (
          <>
            <nav className="flex justify-end pt-8">
              <a
                href="https://github.com/JesacaLin/dev-kitty.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/Github@2x.svg" alt="Github logo" />
              </a>
            </nav>
            <div className="flex items-end mt-[19rem] mb-[6.5rem]">
              <div className="max-w-[70%]">
                <img src="/img/DEV.png" alt="Dev Kitty title" />
              </div>
              <div>
                <img
                  src="/img/logo-yellow@2x.svg"
                  className="max-w-[70%]"
                  alt="site logo"
                />
              </div>
              <p className="ml-auto whitespace-pre-line">
                // A platform to practice developer interview questions with
                cute animals! //
              </p>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default Header;
