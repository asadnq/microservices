# Temp.

- Add project task to update

# Milestones

- Add a task to auto-generate class definitions on demand

---
# 2023-12-26

- Demonstrate resolving a query from multiple subgraphs
  - Meaasure the performance. Ensure it doesn't face n+1 problem
- Set up simple crud for two servcies
  - Dockerize the db
- How to maintain schema consistency both on database and graphql

- [ ] Better envars setup.
  - Both `user-service` and `user-db` needs the same exact env variables. The former needs to have the value on runtime, meanwhile the latter needs the value when instantiating a docker container.

# 2023-12-10

- Configuring schema-first nest js subgraph in Nx project
- Contrib: there's no mention ts-morph as a dependency in Nest JS tutorial


# Best practices notes

Solving n+1 query from multiple subgraphs
