import Manager, { ManagerOption } from '@moveable/utils/Manager';

export interface RotatableOption extends ManagerOption {
  visible?: boolean;
}

class Rotatable extends Manager {
  static type = 'manager:rotatable';

  constructor(options: RotatableOption) {
    super(options);
  }
}

export default Rotatable;
