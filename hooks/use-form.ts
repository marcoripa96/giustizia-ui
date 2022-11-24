import { useState, ChangeEvent, FormEvent, ReactNode, PropsWithChildren, cloneElement } from "react";

type State<T> = {
  value: T;
};

type RenderProps<T> = {
  onChange: (event: T) => void;
  value: any;
}

type FormFieldProps<T> = RenderProps<T> & {
  render: (props: RenderProps<T>) => JSX.Element;
}

export function FormField<T>({ render, ...renderProps }: FormFieldProps<T>) {
  return render(renderProps);
}

const getInputValue = (event: any) => {
  if (event.currentTarget) {
    return event.currentTarget.value;
  }
  return event;
}

/**
 * Hook which holds the state of a form
 */
export function useForm<T>(defaultValues: T) {
  const [isDirty, setIsDirty] = useState(false);
  const [state, setState] = useState<State<T>>({
    value: defaultValues
  });

  /**
   * Set value of a field
   */
  const setValue = (props: Partial<T>) => {
    // key: keyof T, value: T[keyof T]
    setState((s) => ({
      ...s,
      value: {
        ...s.value,
        ...props
      }
    }));
    // setIsDirty(true);
  };

  /**
   * Register an input. Each input should provide a value and onChange props
   */
  const register = (key: keyof T) => {
    const onChange = (event: any) => {
      const value = getInputValue(event);
      setValue({ [key]: value } as Partial<T>);
      setIsDirty(true);
    };

    return {
      value: state.value[key] as any,
      onChange
    };
  };

  const onSubmit = (handle: (value: State<T>["value"]) => void) => {
    return (event: FormEvent) => {
      event.preventDefault();
      setIsDirty(false);
      handle(state.value);
    };
  };

  return {
    value: state.value,
    isDirty,
    setValue,
    register,
    onSubmit
  };
}