import {MenuToggle} from "./menu-toggle";
import {MenuLink} from "./menu-link";
export class MenuHeading {
  name: string;
  children: (MenuToggle|MenuLink)[];
  className: string;
  type: string;
}
