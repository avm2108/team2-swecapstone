//
//  School.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/15/23.
//

import Foundation

struct School: Codable, Identifiable {
    var id: String
    var location: Location
}

struct Location: Codable {
    var latitude: Double
    var longitude: Double
    
    enum CodingKeys: String, CodingKey {
        case latitude = "_latitude"
        case longitude = "_longitude"
    }
}
