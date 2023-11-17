//
//  Student.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/15/23.
//

import Foundation

struct Student: Codable, Identifiable, Comparable {
    var id: String
    var name: String?
    var birth: String?
    var address: Address?
    var scooper: String?
    var status: Bool
    var position: Int
    var grade: String?
    var guardian: Parent?
    
    static func == (lhs: Student, rhs: Student) -> Bool {
        return lhs.status == rhs.status
    }
    
    static func <(lhs: Student, rhs: Student) -> Bool {
        return lhs.position < rhs.position
    }
}

struct Address: Codable, Identifiable {
    var id: String?
    var address, city, state, zipCode: String?
    var type: String?
}

struct Parent: Codable, Identifiable {
    var id: String?
    var email, name, phone, relation: String?
    var vehicle: Vehicle?
}

struct Vehicle: Codable, Identifiable {
    var id: String?
    var color, year, model, make, licensePlate: String?
}
