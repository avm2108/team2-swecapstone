//
//  User.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/15/23.
//

import Foundation

struct User: Codable, Identifiable {
    var id: String
    var phone, name, email: String
}
