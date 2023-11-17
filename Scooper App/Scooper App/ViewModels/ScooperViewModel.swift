//
//  ScooperViewModel.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/15/23.
//

import Foundation

final class ScooperViewModel: ObservableObject {
    @Published var secureKey: [Key]?
    @Published var user: [User]?
    @Published var school: [School]?
    @Published var students: [Student]?
    @Published var isLoading = false
    
    
    func getKey() async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/key") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "GET"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
        let decoder = JSONDecoder()
        let decoded = try decoder.decode([Key].self, from: data)
        self.secureKey = decoded
    }
    
    func getUser() {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/user/lFc4lWXlGTQvdb5FFXZP") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "GET"
        
        let dataTask = URLSession.shared.dataTask(with: urlRequest) {(data, response, error) in
            if let error = error {
                print("Request error: ", error)
                return
            }
            
            guard let response = response as? HTTPURLResponse else {return}
            
            if response.statusCode == 200 {
                guard let data = data else {return}
                DispatchQueue.main.async { [weak self] in
                    do {
                        let decorder = JSONDecoder()
                        let decoded = try decorder.decode([User].self, from: data)
                        self?.user = decoded
//                        if let str = String(data: data, encoding: .utf8) {
//                            print(str)
//                        }
                    } catch let error {
                        print("Error decoding: ", error)
                    }
                }
            }
        }
        dataTask.resume()
    }
    
    func getStudents() async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/student") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "GET"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
        let decoder = JSONDecoder()
        let decoded = try decoder.decode([Student].self, from: data)
        self.students = decoded
    }
    
    func getCoordinates(id: String) async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/location") else {
            fatalError("Missing URL")
        }
        
        let payload: [String: Any] = ["id": id]
        
        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        urlRequest.httpBody = jsonData
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
        let decoder = JSONDecoder()
        let decoded = try decoder.decode([School].self, from: data)
        self.school = decoded
    }
    
    func dismiss(status: Bool, id: String, position: Int) {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/student") else {
            fatalError("Missing URL")
        }
        let fullURL = url.appendingPathComponent(id)
        
        let payload: [String: Any] = ["status": status, "position": position]
        
        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
        
        var urlRequest = URLRequest(url: fullURL)
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
        urlRequest.httpMethod = "PUT"
        urlRequest.httpBody = jsonData
        
        let dataTask = URLSession.shared.uploadTask(with: urlRequest, from: jsonData) { (responseData, response, error) in
            if let error = error {
                print("Error making PUT request: \(error.localizedDescription)")
                return
            }
            
            if let responseCode = (response as? HTTPURLResponse)?.statusCode, let responseData = responseData {
                guard responseCode == 200 else {
                    print("Invalid response code: \(responseCode)")
                    return
                }
                
                if (try? JSONSerialization.jsonObject(with: responseData, options: .allowFragments)) != nil {
//                    print("Response JSON data = \(responseJSONData)")
                }
            }
        }
        dataTask.resume()
    }
    
//    func updateStudent(id: String, email: String = "", name: String = "", phone: String = "", relation: String = "") {
//        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/student") else {
//            fatalError("Missing URL")
//        }
//        let fullURL = url.appendingPathComponent(id)
//        
//        let payload: [String: Any] = ["guardian": ["email": email, "name": name, "phone": phone, "relation": relation]]
//        
//        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
//        
//        var urlRequest = URLRequest(url: fullURL)
//        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
//        urlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
//        urlRequest.httpMethod = "PUT"
//        urlRequest.httpBody = jsonData
//        
//        let dataTask = URLSession.shared.uploadTask(with: urlRequest, from: jsonData) { (responseData, response, error) in
//            if let error = error {
//                print("Error making PUT request: \(error.localizedDescription)")
//                return
//            }
//            
//            if let responseCode = (response as? HTTPURLResponse)?.statusCode, let responseData = responseData {
//                guard responseCode == 200 else {
//                    print("Invalid response code: \(responseCode)")
//                    return
//                }
//                
//                if (try? JSONSerialization.jsonObject(with: responseData, options: .allowFragments)) != nil {
////                    print("Response JSON data = \(responseJSONData)")
//                }
//            }
//        }
//        dataTask.resume()
//    }
    
//    func addStudent(student: Student) async throws {
//        
//        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/student") else {
//            fatalError("Missing URL")
//        }
//        
//        let payload: [String: Any] = ["address": ["address": student.address ?? "", "city": student.address?.city ?? "", "state": student.address?.state ?? "", "type": student.address?.type ?? "", "zipCode": student.address?.zipCode ?? ""], "birth": student.birth ?? "", "grade": student.grade ?? "", "id": student.id, "name": student.name ?? "", "position": student.position, "scooper": student.scooper ?? "", "status": student.status]
//                
//        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
//        
//        var urlRequest = URLRequest(url: url)
//        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
//        urlRequest.httpMethod = "POST"
//        urlRequest.httpBody = jsonData
//        
//        print(jsonData)
//        
////        let (data, response) = try await URLSession.shared.upload(for: urlRequest, from: jsonData ?? <#default value#>)
////        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
////        
////        if let str = String(data: data, encoding: .utf8) {
////            print(str)
////        }
//    }
}
