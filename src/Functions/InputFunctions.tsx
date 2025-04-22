export const handleInputChange = <T,>(setState: React.Dispatch<React.SetStateAction<T>>, field: keyof T) => (value: string) => {
    setState(prevState => ({
        ...prevState,
        [field]: value
    }));
}