//
//  LoginViewModel.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/12/23.
//

import Foundation
import FirebaseAuth

final class LoginViewModel: ObservableObject {
    @Published var email = ""
    @Published var password = ""
    @Published var user: AuthDataResultModel? = nil
    @Published var uuid: String?
    @Published var name: String?
    @Published var isLoading = false
    
    func loadCurrentUser() {
        self.user = try? LoginManager.instance.getAuthenticatedUser()
        if let id = user?.uid {
            uuid = id
        }
        if let displayName = user?.displayName {
            name = displayName
        }
    }
}

final class LoginManager  {
    
    static let instance = LoginManager()
    private init() { }
    
    func getAuthenticatedUser() throws -> AuthDataResultModel {
        guard let user = Auth.auth().currentUser  else {
            throw URLError(.badServerResponse)
        }
        return AuthDataResultModel(user: user)
    }
    
    @discardableResult
    func signInUser(email: String, password: String) async throws -> AuthDataResultModel {
        let authDataResult = try await Auth.auth().signIn(withEmail: email, password: password)
        return AuthDataResultModel(user: authDataResult.user)
    }
    
    func signOut() throws {
        try Auth.auth().signOut()
    }
}
