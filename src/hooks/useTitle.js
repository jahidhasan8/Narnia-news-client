import { useEffect } from "react"

const useTitle=title=>{
    useEffect(()=>{
        document.title=`${title} -Narnia News`;
    },[title])
};

export default useTitle;
