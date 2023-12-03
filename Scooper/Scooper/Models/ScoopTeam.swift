//
//  ScoopTeam.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/1/23.
//

import Foundation

struct ScoopTeam: Codable, Identifiable {
    var id: String
    var team: [Team]
}

struct Team: Codable, Identifiable {
    var id: String
    var phone, name, relation: String
    var vehicle: Vehicle
}
