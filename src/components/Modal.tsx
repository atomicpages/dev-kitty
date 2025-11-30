import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  tip: string;
  image: string;
  onMore: () => void;
}

function Modal({ isOpen, onClose, tip, image, onMore }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog open={isOpen} className="z-10">
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-[5px] z-10`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 text-black bg-[#F9F8F8] p-16 rounded-[25px] shadow-[0_3rem_5rem_rgba(0,0,0,0.3)] z-10 font-light text-[1.6rem] leading-[139%] tracking-[0.02em] z-10 ${!isOpen ? "hidden" : ""}`}
      >
        <h3 className="title">Question:</h3>
        <p id="tipParagraph">{tip}</p>
        <img
          className="max-w-[50%] mx-auto"
          src={image}
          alt="Surprise cute animal photo"
        />
        <li className="flex justify-center pt-8">
          <div>
            <button className="w-[130px] h-[50px] shadow-[0px_4px_4px_2px_#FFC0CB] opacity-90 rounded-[25px] pt-0 text-black text-[1.2rem] text-center m-2.5 font-light leading-[169%] tracking-[0.02em] font-['Akshar',sans-serif]">
              <img
                src="/img/heart.svg"
                className="text-center pt-2.5 max-w-[20%] mx-auto"
                alt="save button"
              />
            </button>
          </div>
          <div>
            <button
              className="w-[130px] h-[50px] shadow-[0px_4px_4px_2px_#FFC0CB] opacity-90 rounded-[25px] pt-0 text-black text-[1.2rem] text-center m-2.5 font-light leading-[169%] tracking-[0.02em] font-['Akshar',sans-serif]"
              onClick={onMore}
            >
              More!
            </button>
          </div>
          <div>
            <button
              className="w-[130px] h-[50px] shadow-[0px_4px_4px_2px_#FFC0CB] opacity-90 rounded-[25px] pt-0 text-black text-[1.2rem] text-center m-2.5 font-light leading-[169%] tracking-[0.02em] font-['Akshar',sans-serif]"
              onClick={onClose}
            >
              <img
                src="/img/x2.svg"
                className="text-center pt-2.5 max-w-[15%] mx-auto"
                alt="close button"
              />
            </button>
          </div>
        </li>
      </div>
    </dialog>
  );
}

export default Modal;
