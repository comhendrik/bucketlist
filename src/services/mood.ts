import { Mood } from '../objects/Mood'

export class UserService {
  async getUsers(): Promise<Mood[]> {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  }

  async getUser(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    const response = await apiClient.post<User>("/users", user);
    return response.data;
  }

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}