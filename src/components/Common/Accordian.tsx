import {
    createContext,
    HTMLAttributes,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { ChevronDown, PlusIcon } from "../Icons/Icons";

interface AccordionContextType {
  selected: string | null;
  setSelected: (value: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

interface AccordionProps
  extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
  children: ReactNode;
  value: string | null;
  onChange?: (value: string | null) => void;
}

export default function Accordion({
  children,
  value,
  onChange,
  ...props
}: AccordionProps) {

  const [selected, setSelected] = useState<string | null>(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  return (
    <ul {...props}>
      <AccordionContext.Provider value={{ selected, setSelected }}>
        {children}
      </AccordionContext.Provider>
    </ul>
  );
}

interface AccordionItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  value: string;
  trigger: ReactNode;
}

export function AccordionItem({
  children,
  value,
  trigger,
  ...props
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItem must be used within an Accordion");

  const { selected, setSelected } = context;
  const open = selected === value;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <li className="border-b " {...props}>
      <header
        role="button"
        onClick={() => setSelected(open ? null : value)}
        className="flex justify-between items-center py-4 pr-4 font-medium font-fsSiena  text-customCongoBrown text-xl lg2:text-2xl"
      >
        {trigger}
        <ChevronDown
          className={`transition-transform duration-300 ${open ? "" : "rotate-180"}`}
        />
      </header>
      <div
        className="overflow-y-hidden transition-all duration-300"
        style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
      >
        <div className="pt-2 pb-4 pr-4" ref={ref}>
          {children}
        </div>
      </div>
    </li>
  );
}
