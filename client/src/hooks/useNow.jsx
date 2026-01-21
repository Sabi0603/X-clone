import { useEffect, useState } from "react";

const useNow = (interval = 1000) => {
    const [, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTick((t) => t + 1);
        }, interval);

        return () => clearInterval(timer);
    }, [interval]);
};

export default useNow;
