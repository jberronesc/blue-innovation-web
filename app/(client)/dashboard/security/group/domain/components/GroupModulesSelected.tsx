"use client";

import { Dispatch, SetStateAction } from "react";
import { TableNative, TNBC, TNBR, TNHC } from "@component/table";
import { ToogleSimple } from "@component/toogle";
import { v4 } from "uuid";
import { GroupMenuModuleSelectedEntity } from "../interfaces/GroupMenuModuleSelectedEntity";

const GroupModulesSelected = ({
  menus,
  setMenus,
}: {
  menus: GroupMenuModuleSelectedEntity[];
  setMenus: Dispatch<SetStateAction<GroupMenuModuleSelectedEntity[]>>;
}) => {
  return (
    <div>
      {menus?.map(({ menu, modulesWrapper, ...menuRest }) => (
        <div key={v4()}>
          <br />
          <div className="text-black">Menu: {menu.name}</div>
          <div>
            <ToogleSimple
              checked={menuRest.isSelected}
              label="Seleccionar menu?"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMenus(
                  menus.map((menuElem) =>
                    menuElem.menu.id != menu.id
                      ? menuElem
                      : {
                          ...menuElem,
                          isSelected: e.target.checked,
                          modulesWrapper: menuElem.modulesWrapper.map(
                            (moduleElem) => ({
                              ...moduleElem,
                              isSelected: e.target.checked,
                              module: {
                                ...moduleElem.module,
                                permissions: moduleElem.module.permissions.map(
                                  (permissionElem) => ({
                                    ...permissionElem,
                                    isSelected: e.target.checked,
                                  }),
                                ),
                              },
                            }),
                          ),
                        },
                  ),
                )
              }
            />
          </div>
          <div>
            <TableNative
              theadTrs={[
                <TNHC key={v4()}>Nº</TNHC>,
                <TNHC key={v4()}>Módulo</TNHC>,
                <TNHC key={v4()}>Acceso Al Módulo</TNHC>,
                <TNHC key={v4()}>Permisos</TNHC>,
                <TNHC key={v4()}>
                  <span className="sr-only">Opciones</span>
                </TNHC>,
              ]}
            >
              {modulesWrapper?.map(({ module, ...moduleRest }, index) => (
                <TNBR key={v4()}>
                  <TNBC>{index + 1}</TNBC>
                  <TNBC>
                    <div>{module.name}</div>
                    <div>{module.url}</div>
                    <div>{menu.name}</div>
                  </TNBC>
                  <TNBC>
                    <ToogleSimple
                      checked={moduleRest.isSelected}
                      label="Sel modulo?"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMenus(
                          menus.map((menuElem) => {
                            if (menuElem.menu.id != module.menu.id)
                              return menuElem;

                            return {
                              ...menuElem,
                              modulesWrapper: menuElem.modulesWrapper.map(
                                (moduleWrapper) => {
                                  if (moduleWrapper.module.id != module.id)
                                    return moduleWrapper;

                                  return {
                                    ...moduleWrapper,
                                    isSelected: e.target.checked,
                                    module: {
                                      ...moduleWrapper.module,
                                      permissions:
                                        moduleWrapper.module.permissions.map(
                                          (permissionElem) => ({
                                            ...permissionElem,
                                            isSelected: e.target.checked,
                                          }),
                                        ),
                                    },
                                  };
                                },
                              ),
                            };
                          }),
                        )
                      }
                    />
                  </TNBC>
                  <TNBC>
                    {module.permissions.map((permission) => (
                      <div key={v4()}>
                        <ToogleSimple
                          checked={permission.isSelected}
                          label={`${permission.name} ${permission.codename}`}
                          disabled={!moduleRest.isSelected}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setMenus(
                              menus.map((menuElem) => {
                                if (menuElem.menu.id != module.menu.id)
                                  return menuElem;

                                return {
                                  ...menuElem,
                                  modulesWrapper: menuElem.modulesWrapper.map(
                                    (moduleWrapper) => {
                                      if (moduleWrapper.module.id != module.id)
                                        return moduleWrapper;

                                      return {
                                        ...moduleWrapper,
                                        module: {
                                          ...moduleWrapper.module,
                                          permissions:
                                            moduleWrapper.module.permissions.map(
                                              (permissionElem) => {
                                                if (
                                                  permissionElem.id !=
                                                  permission.id
                                                )
                                                  return permissionElem;

                                                return {
                                                  ...permissionElem,
                                                  isSelected: e.target.checked,
                                                };
                                              },
                                            ),
                                        },
                                      };
                                    },
                                  ),
                                };
                              }),
                            )
                          }
                        />
                      </div>
                    ))}
                  </TNBC>
                  <TNBC>More</TNBC>
                </TNBR>
              ))}
            </TableNative>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupModulesSelected;
