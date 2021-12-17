export class QueryBuilder {
  private readonly query = [];

  private addStep(step: string, data: Record<string, unknown>): QueryBuilder {
    this.query.push({
      [step]: data,
    });
    return this;
  }

  match(data: Record<string, unknown>) {
    return this.addStep('$match', data);
  }

  project(data: Record<string, unknown>): QueryBuilder {
    return this.addStep('$project', data);
  }

  build(): Record<string, unknown>[] {
    return this.query;
  }
}
