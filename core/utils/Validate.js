/**
 * validate som rules
 */
export default class Validate{
  static id(id) {
   let pattern = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i;
    return pattern.test(id) ? true : 'Please enter a valid bundle identifier! E.g. com.company.project'; 
  }
}