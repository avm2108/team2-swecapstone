//
//  ScoopRequest.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/4/23.
//

import Foundation

struct ScoopRequest: Codable, Identifiable, Comparable {
    static func < (lhs: ScoopRequest, rhs: ScoopRequest) -> Bool {
        return lhs.id < rhs.id
    }
    
    var id: String
    var date, note, student, time: String
    var status: Bool
}
