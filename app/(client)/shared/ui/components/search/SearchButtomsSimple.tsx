import { Button, ButtonGroup } from "@nextui-org/button";
import { IconBrush, IconSearch } from "@tabler/icons-react";
import React from "react";

export const SearchButtomsSimple = ({
  handleClean,
}: {
  handleClean: () => void;
}) => {
  return (
    <ButtonGroup>
      <Button
        color="default"
        variant="shadow"
        startContent={<IconBrush />}
        onPress={handleClean}
      >
        Limpiar
      </Button>

      <Button
        color="default"
        variant="shadow"
        startContent={<IconSearch />}
        type="submit"
      >
        Buscar
      </Button>
    </ButtonGroup>
  );
};
