import axios from "axios";

export default class PostService {
  static token = document.cookie.split("=")[1];
  static config = {
    headers: {
      Authorization: `Bearer ${PostService.token}`,
    },
  };

  static async postAuthorization(login, pass) {
    const response = await axios.post("https://m.x09.ru/api/token/", {
      email: login,
      password: pass,
    });
    const token = response.data.access;
    document.cookie = `token=${token}`;
    return response;
  }
  static async getStudenRoles() {
    const token = document.cookie.split("=")[1];
    const response = axios.get("https://m.x09.ru/api/roles_on_intensives/", {
      headers: `Authorization: Bearer ${token}`,
    });
    return response;
  }

  static async getCommandsOnIntensive(id) {
    const token = document.cookie.split("=")[1];
    const response = axios.get(
      `https://m.x09.ru/api/commands_on_intensives/?intensive=${id}`,
      {
        headers: `Authorization: Bearer ${token}`,
      }
    );
    return response;
  }

  static async getTeachersOnIntensive(id) {
    const token = document.cookie.split("=")[1];
    const response = axios.get(
      `https://m.x09.ru/api/teachers_on_intensives/?intensive=${id}`,
      {
        headers: `Authorization: Bearer ${token}`,
      }
    );
    return response;
  }

  static async getAuditorii() {
    const token = document.cookie.split("=")[1];
    const response = axios.get(`https://m.x09.ru/api/auditories/`, {
      headers: `Authorization: Bearer ${token}`,
    });
    return response;
  }

  static async getStage() {
    const token = document.cookie.split("=")[1];
    const response = axios.get(`https://m.x09.ru/api/stages/`, {
      headers: `Authorization: Bearer ${token}`,
    });
    return response;
  }

  static async getTeachers() {
    const token = document.cookie.split("=")[1];
    const response = axios.get("https://m.x09.ru/api/teachers/", {
      headers: `Authorization: Bearer ${token}`,
    });
    return response;
  }

  static async postIntensives(
    name,
    description,
    startDate,
    endDate,
    flows,
    teachers,
    rolesStudent,
    files
  ) {
    const response = await axios.post(
      "https://m.x09.ru/api/intensives/",
      {
        university: 1,
        name: name,
        description: description,
        is_open: true,
        open_dt: startDate,
        close_dt: endDate,
        roles: rolesStudent,
        flow: flows || [],
        teachers_command: teachers || [],
        files: files || [],
        stages: [],
      },
      PostService.config
    );
    return response;
  }
  static async patchIntensives(
    name,
    description,
    startDate,
    endDate,
    flows,
    teachers,
    rolesStudent,
    files
  ) {
    const token = document.cookie.split("=")[1];
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("id", localStorage.getItem("id"));
    const response = await axios.patch(
      `https://m.x09.ru/api/intensives/${localStorage.getItem("id")}/`,
      {
        name: name,
        description: description,
        is_open: true,
        open_dt: startDate,
        close_dt: endDate,
        roles: rolesStudent,
        flow: flows || [],
        teachers_command: teachers || [],
        files: files || [],
        stages: [],
      },
      config
    );
    return response;
  }
  static async postEvent(
    name,
    description,
    startDate,
    endDate,
    teachers,
    commands,
    stage,
    auditory,
    typeScore,
    typeResult
  ) {
    const token = document.cookie.split("=")[1];
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const idInt = localStorage.getItem("id");
    const idEvent = localStorage.getItem("idEvent");
    const response = await axios.post(
      `https://m.x09.ru/api/events/`,
      {
        name: name,
        description: description,
        start_dt: startDate,
        finish_dt: endDate,
        stage: stage,
        auditory: auditory,
        mark_strategy: 1,
        result_type: 1,
        intensiv: idInt,
        commands: commands || [],
        teachers_command: teachers || [],
      },
      config
    );
    return response;
  }

  static async patchEvent(
    name,
    description,
    startDate,
    endDate,
    teachers,
    commands,
    stage,
    auditory,
    typeScore,
    typeResult
  ) {
    const token = document.cookie.split("=")[1];
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const idInt = localStorage.getItem("id");
    const idEvent = localStorage.getItem("idEvent");
    const response = await axios.patch(
      `https://m.x09.ru/api/events/${idEvent}/`,
      {
        name: name,
        description: description,
        start_dt: startDate,
        finish_dt: endDate,
        stage: stage,
        auditory: auditory,
        mark_strategy: typeScore || 1,
        result_type: typeResult || 1,
        intensiv: idInt,
        commands: commands || [],
        teachers_command: teachers || [],
      },
      config
    );
    return response;
  }

  static async postStudentsRole(name) {
    const response = await axios.post(
      "https://m.x09.ru/api/roles_on_intensives/",
      {
        name: name,
      },
      PostService.config
    );
    return response;
  }
  static async deleteStudentsRole(id) {
    const response = await axios.delete(
      `https://m.x09.ru/api/roles_on_intensives/${id}/`,
      PostService.config
    );
    return response;
  }

  static async getIntensiv(id) {
    const token = document.cookie.split("=")[1];
    const response = await axios.get(`https://m.x09.ru/api/intensives/${id}`, {
      headers: `Authorization: Bearer ${token}`,
    });
    return response;
  }

  static async deleteIntensiv(id) {
    const token = document.cookie.split("=")[1];
    const response = await axios.delete(
      `https://m.x09.ru/api/intensives/${id}`,
      {
        headers: `Authorization: Bearer ${token}`,
      }
    );
    return response;
  }

  static async getIntensives() {
    const token = document.cookie.split("=")[1];
    const response = await axios.get("https://m.x09.ru/api/intensives/", {
      headers: `Authorization: Bearer ${token}`,
    });
    return response;
  }
  static async getCriteris() {
    const token = document.cookie.split("=")[1];
    const response = await axios.get("https://m.x09.ru/api/criteria/");
  }
  static async getEvents(id) {
    const token = document.cookie.split("=")[1];
    const response = await axios.get(
      `https://m.x09.ru/api/events/?intensiv=${id}`,
      {
        headers: `Authorization: Bearer ${token}`,
      }
    );
    return response;
  }
  static async getEvent(id) {
    const token = document.cookie.split("=")[1];
    const response = await axios.get(`https://m.x09.ru/api/events/${id}/`, {
      headers: `Authorization: Bearer ${token}`,
    });
    return response;
  }

  static async getGroups() {
    const token = document.cookie.split("=")[1];
    const response = await axios.get("https://m.x09.ru/api/groups/");
  }

  static async getProfiles() {
    const token = document.cookie.split("=")[1];
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
    const token = document.cookie.split("=")[1];
    const response = axios.get("https://m.x09.ru/api/flows/", {
      headers: `Authorization: Bearer ${token}`,
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
    const token = document.cookie.split("=")[1];
    const response = await axios.get(
      `https://m.x09.ru/api/statistics/intensiv/${id}`,
      {
        headers: `Authorization: Bearer ${token}`,
      }
    );
    return response;
  }

  static async getStatisticsCommand(id) {
    const token = document.cookie.split("=")[1];
    const response = await axios.get(
      `https://m.x09.ru/api/statistics/command/${id}`,
      {
        headers: `Authorization: Bearer ${token}`,
      }
    );
    return response;
  }
}
