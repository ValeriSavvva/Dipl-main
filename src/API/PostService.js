import axios from "axios";

export default class PostService {

  static getToken(){
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwODE4NzUyLCJpYXQiOjE3MTgyMjY3NTIsImp0aSI6ImUxN2FmODQ0ZWZjMDQ3NWZiM2VkY2JiMjhhNjRjZmQ4IiwidXNlcl9pZCI6Mn0.TRN36WTf0RJg3Xu_sVSrPEjagKiVqjWbbsYsQEefi0c";
  };

  static async postAuthorization(login, pass) {
    const response = await axios.post("https://m.x09.ru/api/token/", {
      email: login,
      password: pass,
    });
  }
  static async getStudenRoles() {
    const response = axios.get("https://m.x09.ru/api/roles_on_intensives/", {
      headers: `Authorization : ${this.token}`,
    });
    return response;
  }


  static async getTeachers() {
    const response = axios.get("https://m.x09.ru/api/teachers/", {
      headers: `Authorization : ${this.token}`,
    });
    return response;
  }

  static async postIntensives(name, description, startDate, endDate, flows, teachers, rolesStudent, files ) {
    const response = await axios.post("https://m.x09.ru/api/intensives/", {
      name: name,
      description: description,
      is_open: true,
      open_dt: startDate,
      close_dt: endDate,
      roles:rolesStudent,
      flow: flows || [],
      teachers_command: teachers || [],
      files: files || [],
      stages:[]
    });
    return response;
  }

  static async postStudentsRole(name) {
    const response = await axios.post("https://m.x09.ru/api/roles_on_intensives/", {
      name: name,
     
    });
    return response;
  }
  static async deleteStudentsRole(id) {
    const response = await axios.delete(`https://m.x09.ru/api/roles_on_intensives/${id}/`);
    return response;
  }

  static async getIntensiv(id) {
    const response = await axios.get(`https://m.x09.ru/api/intensives/${id}`, {
      headers: "Authorization: Bearer " + PostService.getToken(),
    });
    return response;
  }

  static async getIntensives() {
    const response = await axios.get("https://m.x09.ru/api/intensives/", {
      headers: "Authorization: Bearer " + PostService.getToken(),
    });
    return response;
  }
  static async getCriteris() {
    const response = await axios.get("https://m.x09.ru/api/criteria/");
  }
  static async getEvents() {
    const response = await axios.get("https://m.x09.ru/api/events/");
  }
  static async getGroups() {
    const response = await axios.get("https://m.x09.ru/api/groups/");
  }

  static async getProfiles() {
    const response = await axios.get("https://m.x09.ru/api/profiles/");
    return response;
  }

  static async postProfiles(name) {
    const response = await axios.post("https://m.x09.ru/api/profiles/", {
      name: name,
    });
    return response;
  }

  static async deleteProfiles(id) {
    const response = await axios.delete(`https://m.x09.ru/api/profiles/${id}/`);
    return response;
  }

  static async getFlows() {
    const response = axios.get("https://m.x09.ru/api/flows/", {
      headers: `Authorization : ${this.token}`,
    });
    return response;
  }

  //Страница редактирования профилей

  static async postProfiles(name) {
    const response = await axios.post("https://m.x09.ru/api/profiles/", {
      name: name,
    });
    return response;
  }

  static async deleteProfiles(id) {
    const response = await axios.delete(`https://m.x09.ru/api/profiles/${id}/`);
    return response;
  }

	//Страница статистики
	static async getStatisticsIntensiv(id) {
		const response = await axios.get(`https://m.x09.ru/api/statistics/intensiv/${id}`, {
			headers: "Authorization: Bearer " + PostService.getToken(),
		});
		return response;
	}

	static async getStatisticsCommand(id) {
		const response = await axios.get(`https://m.x09.ru/api/statistics/command/${id}`, {
			headers: "Authorization: Bearer " + PostService.getToken(),
		});
		return response;
	}
}
