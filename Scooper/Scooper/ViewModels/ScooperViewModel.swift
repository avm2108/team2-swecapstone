//
//  ScooperViewModel.swift
//  Scooper
//
//  Created by Ryheem Heard on 11/20/23.
//

import Foundation


final class ScooperViewModel: ObservableObject {
    
    @Published var students: [Student] = [Student(id: "", name: "", birth: "", address: Address(address: "", city: "", state: "", zipCode: "", type: ""), scooper: "", status: false, position: 1000, grade: "", guardian: Parent(email: "", name: "", phone: "", relation: "", vehicle: Vehicle(color: "", year: "", model: "", make: "", licensePlate: "")))]
    
    @Published var scoopTeam: [ScoopTeam] = [ScoopTeam(id: "", team: [Team(id: "", phone: "", name: "", relation: "", vehicle: Vehicle(color: "", year: "", model: "", make: "", licensePlate: ""))])]
    
    @Published var scooper: String = ""
    
    @Published var scoopRequest: [ScoopRequest] = [ScoopRequest(id: "", date: "", note: "", student: "", time: "", status: false)]
    
    @Published var familyStatus: [Student] = [Student(id: "", name: "", birth: "", address: Address(address: "", city: "", state: "", zipCode: "", type: ""), scooper: "", status: false, position: 0, grade: "", guardian: Parent(email: "", name: "", phone: "", relation: "", vehicle: Vehicle(color: "", year: "", model: "", make: "", licensePlate: "")))]
    
    @Published var authUser: AuthDataResultModel?
        
    @MainActor
    func getStudent(id: String) async throws -> String {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/student/\(id)") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "GET"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else {
            return "Error"
        }
        let decoder = JSONDecoder()
        let decoded = try decoder.decode([Student].self, from: data)
        self.students = decoded
        
        self.scooper = students[0].scooper
        return students[0].id
    }
    
    func getChilren(name: String = "Deborah Williams") async throws {
        
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/parent/\(name)") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "GET"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { throw NetworkError.badRequest }
        let decoder = JSONDecoder()
        let decoded = try decoder.decode([Student].self, from: data)
        self.familyStatus = decoded
    }
    
    enum NetworkError: Error {
        case badRequest
    }
    
    func getScoopTeam(id: String) async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/team/\(id)") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "GET"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { throw NetworkError.badRequest }
        let decoder = JSONDecoder()
        let decoded = try decoder.decode([ScoopTeam].self, from: data)
        self.scoopTeam = decoded
        if let str = String(data: data, encoding: .utf8) {
            print(str)
        }
    }
    
    func updateScooper(id: String, scooper: String) async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/team/\(id)") else {
            fatalError("Missing URL")
        }
        
        let payload: [String: Any] = [
            "scooper": scooper
        ]
        
        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "PUT"
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-type")
        urlRequest.httpBody = jsonData
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
        if let str = String(data: data, encoding: .utf8) {
            print(str)
        }
    }
    
    func scoopRequest(id: String, date: String, time: String, note: String, student: String) async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/scoop") else { fatalError("Missing URL") }
        
        let payload: [String: Any] = [
            "id": id,
            "date": date,
            "time": time,
            "note": note,
            "student": student
        ]
        
        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-type")
        urlRequest.httpBody = jsonData
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
        if let str = String(data: data, encoding: .utf8) {
            print(str)
        }
    }
    
    func getScoopRequest(id: String = "") async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/scoop/\(id)") else { fatalError("Missing URL") }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "GET"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { throw NetworkError.badRequest }
        let decoder = JSONDecoder()
        let decoded = try decoder.decode([ScoopRequest].self, from: data)
        self.scoopRequest = decoded
//        if let str = String(data: data, encoding: .utf8) {
//            print(str)
//        }
    }
    
    func addToQueue(id: String) async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/queueManager/\(id)") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
        if let str = String(data: data, encoding: .utf8) {
            print(str)
        }
    }
    
    private func getAccessToken() async throws -> String {
    guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/security") else {
        fatalError("Missing URL")
    }
    
    var urlRequest = URLRequest(url: url)
    urlRequest.httpMethod = "GET"
    
    let (data, response) = try await URLSession.shared.data(for: urlRequest)
    guard (response as? HTTPURLResponse)?.statusCode == 200 else { return response.textEncodingName ?? ""}
    
    if let accessToken = String(data: data, encoding: .utf8) {
        return accessToken
    }
    return ""
}
    
    func sendArrivalNotification(deviceToken: String = "", name: String) async throws {
        
        let accessToken = (try? await getAccessToken()) ?? ""
        
        let token = "Bearer " + accessToken
        
        guard let url = URL(string: "https://fcm.googleapis.com/v1/projects/scooper-df18f/messages:send") else {
            fatalError("Missing URL")
        }
        
        let payload: [String: Any] = [
            "message": [
                "topic": "scooper",
                "notification": [
                    "body": "\(name) has arrived!",
                    "title": "Parent Arrival",
                ]
            ]
        ]
        
        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        urlRequest.addValue(token, forHTTPHeaderField: "Authorization")
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-type")
        urlRequest.httpBody = jsonData
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
        if let str = String(data: data, encoding: .utf8) {
            print(str)
        }
    }
    
    func sendScheduleScoopUpNotification(deviceToken: String = "", name: String) async throws {
        
        let accessToken = (try? await getAccessToken()) ?? ""
        
        let token = "Bearer " + accessToken
        
        guard let url = URL(string: "https://fcm.googleapis.com/v1/projects/scooper-df18f/messages:send") else {
            fatalError("Missing URL")
        }
        
        let payload: [String: Any] = [
            "message": [
                "topic": "scooper",
                "notification": [
                    "body": "\(name) has scheduled a scoop up!",
                    "title": "Scoop Request",
                ]
            ]
        ]
        
        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        urlRequest.addValue(token, forHTTPHeaderField: "Authorization")
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-type")
        urlRequest.httpBody = jsonData
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
        if let str = String(data: data, encoding: .utf8) {
            print(str)
        }
    }
}

