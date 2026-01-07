import { useEffect, useRef } from "react";

function useOutsideClick(handler, listnerCapturing = true) {

  const ref = useRef();
  


  useEffect(function () {


    function handleClick(event) {
      // if(event.key === "Escape"){
      //   close();
      // }

      if(ref.current && !ref.current.contains(event.target)) {
        console.log("Clicked outside modal");
        handler();
      }

    }

      document.addEventListener("click", handleClick, listnerCapturing);
      return () => document.removeEventListener("click", handleClick, listnerCapturing);


  }, [ handler, listnerCapturing]);

  return ref;
}

export default useOutsideClick;
