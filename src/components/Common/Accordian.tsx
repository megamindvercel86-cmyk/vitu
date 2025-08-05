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
    setSelected(value);
  }, [value]);

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
  fontFamily?: string;
  fontWeight?: string;
  textColor?: string;
  textSize?: string;
}

/**
 * Represents a single item within an accordion component.
 *
 * @remarks
 * This component must be used within an `Accordion` context. It displays a clickable header (`trigger`)
 * and reveals or hides its children content when toggled. The open/close state is managed via context.
 * The component supports custom font family, weight, color, and size via props.
 *
 * @param props - The props for the AccordionItem component.
 * @param props.children - The content to display inside the accordion panel.
 * @param props.value - The unique value identifying this item within the accordion.
 * @param props.trigger - The header content that acts as the clickable trigger.
 * @param [props.fontFamily] - Optional Tailwind CSS font family class for the header (default: "font-fsSiena").
 * @param [props.fontWeight] - Optional Tailwind CSS font weight class for the header (default: "font-medium").
 * @param [props.textColor] - Optional Tailwind CSS text color class for the header (default: "text-customCongoBrown").
 * @param [props.textSize] - Optional Tailwind CSS text size class for the header (default: "text-xl lg2:text-2xl").
 * @throws Error if used outside of an `Accordion` context.
 *
 * @example
 * ```tsx
 * <Accordion>
 *   <AccordionItem value="item1" trigger="Section 1">
 *     Content for section 1
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export function AccordionItem({
  children,
  value,
  trigger,
  fontFamily = "font-freightNeoMedium",
  fontWeight = "font-medium",
  textColor = "text-customCongoBrown",
  textSize = "lg:text-xl lg2:text-2xl",
  ...props
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItem must be used within an Accordion");

  const { selected, setSelected } = context;
  const open = selected === value;
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open && ref.current) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open, children]);

  return (
    <li className="border-b" {...props}>
      <header
        role="button"
        style={{ color: textColor }}
        onClick={() => setSelected(open ? null : value)}
        className={`flex justify-between items-center py-4 pr-4 ${fontWeight} ${fontFamily} ${textSize}`}
      >
        {trigger}
        <ChevronDown
          className={`transition-transform min-w-max duration-300 ${open ? "" : "rotate-180"}`}
        />
      </header>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ height }}
      >
        <div className="pt-2 pb-4 pr-4" ref={ref}>
          {children}
        </div>
      </div>
    </li>
  );
}
