import { IconBrush, IconSearch } from "@tabler/icons-react";
import React from "react";
import { ButtonGroup } from "../../shadcn/ui/button-group";
import { Button } from "../../shadcn/ui/button";

export const SearchButtomsSimple = ({
  handleClean,
}: {
  handleClean: () => void;
}) => {
  return (
    <ButtonGroup>
      <Button variant="outline" onClick={handleClean}>
        <IconBrush /> Limpiar
      </Button>

      <Button variant="outline" type="submit">
        <IconSearch /> Buscar
      </Button>
    </ButtonGroup>
  );
};
