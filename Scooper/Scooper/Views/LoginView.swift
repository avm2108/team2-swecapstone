//
//  LoginView.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/7/23.
//

import SwiftUI
import Firebase

struct LoginView: View {
    
    @State private var isPresented = false
    @State private var loginManager = LoginViewModel()
    @Binding var showSignInView: Bool
    @State private var isShowingAlert = false
    
    var body: some View {
        ZStack(alignment: .center) {
            Color.scooperYellow
                .ignoresSafeArea()
            
            VStack {
                                
                Image("logo")
                    .resizable()
                    .frame(width: 340, height: 160)
                    .padding(.top, 200)
                
                if (isPresented) {
                    VStack {
                        TextField("Email", text: $loginManager.email)
                            .padding()
                            .background(.gray.opacity(0.3))
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                            .keyboardType(.emailAddress)
                        
                        SecureField("Password", text: $loginManager.password)
                            .padding()
                            .background(.gray.opacity(0.3))
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    }
                    
                    Spacer()
                    
                    Button {
                        Task {
                            do {
                                loginManager.user = try await LoginManager.instance.signInUser(email: loginManager.email, password: loginManager.password)
                                showSignInView = false
                            } catch {
                                isShowingAlert = true
                                print(error)
                            }
                        }
                        isPresented = false
                    } label: {
                        Text("Submit")
                    }
                    .font(.headline)
                    .frame(height: 55)
                    .frame(minWidth: 360)
                    .foregroundColor(.white)
                    .background(.blue)
                    .clipShape(Rectangle())
                    .cornerRadius(10)
                    
                } else {
                    Spacer()
                    
                    Button {
                        isPresented = true
                    } label: {
                        Text("Login")
                    }
                    .font(.headline)
                    .frame(height: 55)
                    .frame(minWidth: 360)
                    .foregroundColor(.white)
                    .background(.scooperGreen)
                    .clipShape(Rectangle())
                    .cornerRadius(10)
                }
            }
            .alert("Sign In Failure", isPresented: $isShowingAlert, actions: {
                Button("OK") {
                    isShowingAlert = false
                    loginManager.email = ""
                    loginManager.password = ""
                }
            }, message: {
                Text("Invalid Credentials")
            })
            .padding()
        }
    }
}

#Preview {
    LoginView(showSignInView: .constant(.random()))
}
