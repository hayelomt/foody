export default interface Findable {
  findOne(id: string): Promise<any>;
}
