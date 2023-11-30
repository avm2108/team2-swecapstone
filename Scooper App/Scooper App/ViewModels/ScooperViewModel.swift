//
//  ScooperViewModel.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/15/23.
//

import Foundation

@MainActor
final class ScooperViewModel: ObservableObject {
    @Published var secureKey: [Key]?
    @Published var school: [School]?
    @Published var students: [Student] = [Student(id: "", name: "", birth: "", address: Address(address: "", city: "", state: "", zipCode: "", type: ""), scooper: "", status: false, position: 0, grade: "", guardian: Parent(email: "", name: "", phone: "", relation: "", vehicle: Vehicle(color: "", year: "", model: "", make: "", licensePlate: "")))]
    @Published var isLoading = false
    
    
    func getKey(id: String) async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/key/\(id)") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "GET"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }
        let decoder = JSONDecoder()
        let decoded = try decoder.decode([Key].self, from: data)
        self.secureKey = decoded
        if let str = String(data: data, encoding: .utf8) {
            print(str)
        }
    }
    
//    func getStudents() {
//        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/student") else {
//            fatalError("Missing URL")
//        }
//        
//        var urlRequest = URLRequest(url: url)
//        urlRequest.httpMethod = "GET"
//        
//        let dataTask = URLSession.shared.dataTask(with: urlRequest) {(data, response, error) in
//            if let error = error {
//                print("Request error: ", error)
//                return
//            }
//            
//            guard let response = response as? HTTPURLResponse else {return}
//            
//            if response.statusCode == 200 {
//                guard let data = data else {return}
//                DispatchQueue.main.async { [weak self] in
//                    do {
//                        let decorder = JSONDecoder()
//                        let decoded = try decorder.decode([Student].self, from: data)
//                        self?.students = decoded
//                        if let str = String(data: data, encoding: .utf8) {
//                            print(str)
//                        }
//                    } catch let error {
//                        print("Error decoding: ", error)
//                    }
//                }
//            }
//        }
//        dataTask.resume()
//    }
    
    func searchStudent(id: String) async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/student/\(id)") else {
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
//        if let str = String(data: data, encoding: .utf8) {
//            print(str)
//        }
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
    
    func updateKey(id: String, key: String) {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/key/\(id)") else {
            fatalError("Missing URL")
        }
                
        let payload: [String: Any] = [
            "guardian": [
                "key": key
            ]
        ]

        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
        
        
        var urlRequest = URLRequest(url: url)
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
        urlRequest.httpMethod = "PUT"
        urlRequest.httpBody = jsonData
        
        let dataTask = URLSession.shared.uploadTask(with: urlRequest, from: jsonData) { (data, response, error) in
            if let error = error {
                print("Error making PUT request: \(error.localizedDescription)")
                return
            }
            
            guard let response = response as? HTTPURLResponse, (200...299).contains(response.statusCode) else {
                print("server error")
                return
            }
        }
        dataTask.resume()
    }
    
    
    func updateStudent(id: String, parent: Parent = Parent(key: "", email: "Test", name: "Test", phone: "Test", relation: "Test", vehicle: Vehicle(id: "Test", color: "Test", year: "Test", model: "Test", make: "Test", licensePlate: "Test"))) {
        
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/parent/\(id)") else {
            fatalError("Missing URL")
        }
        
        let payload: [String: Any] = [
            "guardian": [
                "email": parent.email,
                "key": "",
                "name": parent.name,
                "phone": parent.phone,
                "relation": parent.relation,
                "vehicle": [
                    "color": parent.vehicle.color,
                    "licensePlate": parent.vehicle.licensePlate,
                    "make": parent.vehicle.make,
                    "model": parent.vehicle.model,
                    "year": parent.vehicle.year
                ],
            ],
            "scooper": parent.name
        ]
        
        
        let jsonData = try? JSONSerialization.data(withJSONObject: payload, options: .prettyPrinted)
        
        
        var urlRequest = URLRequest(url: url)
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
        urlRequest.httpMethod = "PUT"
        urlRequest.httpBody = jsonData
        
        let dataTask = URLSession.shared.uploadTask(with: urlRequest, from: jsonData) { (data, response, error) in
            if let error = error {
                print("Error making PUT request: \(error.localizedDescription)")
                return
            }
            
            guard let response = response as? HTTPURLResponse, (200...299).contains(response.statusCode) else {
                print("server error")
                return
            }
            
            if let mimeType = response.mimeType,
               mimeType == "application/json",
               let data = data,
               let dataString = String(data: data, encoding: .utf8) {
                print (dataString)
            }
        }
        dataTask.resume()
    }
    
    func addStudent(student: Student = Student(id: "0", name: "Test", birth: "04/1/2001", address: Address(address: "123 Test St", city: "Test", state: "Test", zipCode: "Test", type: "Test"), scooper: "Test", status: false, position: 0, grade: "Test", guardian: Parent(email: "Test", name: "Test", phone: "Test", relation: "Test", vehicle: Vehicle(color: "Test", year: "Test", model: "Test", make: "Test", licensePlate: "Test")))) {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/student") else {
            fatalError("Missing URL")
        }
        
        let payload: [String: Any] = [
            "address": [
                "address": student.address.address,
                "city": student.address.city,
                "state": student.address.state,
                "type": student.address.type,
                "zipCode": student.address.zipCode
            ],
            "birth": student.birth,
            "grade": student.grade,
            "id": student.id,
            "name": student.name,
            "position": student.position,
            "status": student.status
        ]
        
        let jsonData = try? JSONSerialization.data(withJSONObject: payload)
        
        var urlRequest = URLRequest(url: url)
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
        urlRequest.httpMethod = "POST"
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
                    print("Response JSON data = \(String(describing: response))")
                }
            }
        }
        dataTask.resume()
    }
    
    enum NetworkRequest: Error {
        case badRequest
    }
    
    func removeStudent(id: String) async throws {
        
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/student/\(id)") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "DELETE"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { throw NetworkRequest.badRequest }
        if let str = String(data: data, encoding: .utf8) {
            print(str)
        }
    }
    
    
    
    func removeFromQueue() async throws {
        guard let url = URL(string: "https://us-central1-scooper-df18f.cloudfunctions.net/queueManager") else {
            fatalError("Missing URL")
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "DELETE"
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { throw NetworkRequest.badRequest }
        if let str = String(data: data, encoding: .utf8) {
            print(str)
        }
    }
}
