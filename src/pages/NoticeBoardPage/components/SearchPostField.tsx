import useDebounce from "@hooks/useDebounce";
import TextField from "@mui/material/TextField";
import { useEffect, useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router";

function SearchPostField() {
  const [searchTerms, setSearchTerms] = useState("");
  const debouncedSearchTerm = useDebounce({ value: searchTerms, delay: 300 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerms(e.target.value);

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (debouncedSearchTerm) {
          next.set("q", debouncedSearchTerm);
        } else {
          next.delete("q");
        }
        return next;
      });
    }
  }, [debouncedSearchTerm, setSearchParams]);

  return (
    <TextField
      id="outlined-basic"
      label="Serach posts..."
      variant="outlined"
      onChange={handleChange}
      className="grow"
    />
  );
}

export default SearchPostField;
