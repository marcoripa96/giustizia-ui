import { cn } from "@/lib/utils";
import { Loading } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, ArrowRight } from "lucide-react";
import { HTMLAttributes, forwardRef, useState } from "react";

type SearchbarProps = HTMLAttributes<HTMLInputElement> & {
  loading?: boolean;
};

const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>((props, ref) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("relative flex flex-col", props.className)}>
      <AnimatePresence>
        {focused && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="bg-gradient-colors absolute -inset-1 z-10 rounded-full" />
        )}
      </AnimatePresence>
      <div className={cn("flex flex-row items-center border-[1px] border-solid z-20 border-slate-200 rounded-full py-1 px-3 w-full gap-4 bg-background")}>
        <SearchIcon />
        <input
          ref={ref}
          className="text-slate-800 resize-none bg-transparent w-full h-full border-none"
          spellCheck="false"
          placeholder="Search documents"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        <button className={cn("flex flex-col items-center justify-center bg-slate-950 text-white border-none rounded-full h-9 w-9 cursor-pointer transition-all", {
          "opacity-20": !focused
        })}>
          {props.loading ? <Loading color="currentColor" size="sm" /> : <ArrowRight />}
        </button>
      </div>
    </div>

  )
});

Searchbar.displayName = "Searchbar"

export { Searchbar }