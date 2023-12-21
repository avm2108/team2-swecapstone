//
//  AuthDataResultModel.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/7/23.
//

import Foundation
import FirebaseAuth

struct AuthDataResultModel: Comparable {
    static func < (lhs: AuthDataResultModel, rhs: AuthDataResultModel) -> Bool {
        return lhs.uid == rhs.uid
    }
    
    let uid: String
    let email: String?
    let displayName: String?
    let photoUrl: String?
    
    init(user: User) {
        self.uid = user.uid
        self.email = user.email
        self.displayName = user.displayName
        self.photoUrl = user.photoURL?.absoluteString
    }
}
