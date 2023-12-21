//
//  ContentView.swift
//  Scooper
//
//  Created by Ryheem Heard on 11/19/23.
//

import SwiftUI
import FirebaseAuth

struct ContentView: View {
    @State private var isPresented = false
    @State private var isShowingStatus = false
    @StateObject private var location: MapViewModel = MapViewModel()
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @StateObject private var login: LoginViewModel = LoginViewModel()
    @State private var showSignInView: Bool = false
    @State private var authUser: AuthDataResultModel?
    @State var studentID: String = ""
    
    var body: some View {
        NavigationStack {
            ZStack(alignment: .topLeading) {
                MapView()
                NavigationLink {
                    MenuView(info: vm.students, showSignInView: $showSignInView, id: studentID)
                } label: {
                    ZStack {
                        Rectangle()
                            .frame(width: 50, height: 50)
                            .foregroundStyle(.white.opacity(0.9))
                            .clipShape(RoundedRectangle(cornerSize: CGSize(width: 10, height: 10)))
                            .shadow(radius: 3)
                        Image("menu")
                            .resizable()
                            .frame(width: 30, height: 30)
                            .foregroundStyle(Color.blue)
                    }
                    .padding()
                }
                .popover(isPresented: $isPresented, content: {
                    
                    if (!login.isLoading) {
                        ScrollView(.vertical) {
                            VStack {
                                ForEach(vm.students) { student in
                                    
                                    Text(student.guardian.name)
                                        .font(.largeTitle.bold())
                                    
                                    AsyncImage(url: URL(string: "https://barcodeapi.org/api/qr/https://us-central1-scooper-df18f.cloudfunctions.net/parent/\(student.guardian.name)"))
                                    
                                    Text("Code:")
                                        .font(.title)
                                        .fontWeight(.heavy)
                                    
                                    Text(student.guardian.key ?? "")
                                        .font(.system(size: 80, weight: .semibold))
                                        .fontWeight(.semibold)
                                        .padding(30)
                                        .frame(width: 350, height: 100, alignment: .center)
                                        .foregroundColor(.gray)
                                }
                                
                                if (isShowingStatus) {
                                    Text("Family Status")
                                        .font(.title2.bold())
                                    
                                    ScrollView(.horizontal) {
                                        
                                        HStack {
                                            ForEach(vm.familyStatus) { student in
                                                VStack {
                                                    ZStack {
                                                        Circle()
                                                            .frame(width: 140, height: 140)
                                                            .foregroundStyle(.scooperGreen.opacity(0.4))
                                                        
                                                        Circle()
                                                            .frame(width: 120, height: 120)
                                                            .foregroundStyle(.scooperGreen)
                                                        
                                                        Text(student.name.first?.description ?? "")
                                                            .font(.system(size: 70).bold())
                                                            .foregroundStyle(.white)
                                                        
                                                    }
                                                    Text(student.name)
                                                    if(!location.hasArrived && student.status) {
                                                        Text("Waiting...")
                                                            .foregroundStyle(.blue)
                                                    } else if (location.hasArrived && student.status) {
                                                        Text("Releasing...")
                                                            .foregroundStyle(.blue)
                                                    } else if (!student.status) {
                                                        Text("Dismissed...")
                                                            .foregroundStyle(.blue)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    .onAppear(perform: {
                                        login.loadCurrentUser()
                                        Task {
                                            try await vm.getChilren(name: login.name ?? "")
                                        }
                                    })
                                }
                            }
                            .padding()
                        }
                        
                        Button {
                            isPresented = false
                        } label: {
                            Text("Home")
                        }
                        .font(.headline)
                        .frame(height: 55)
                        .frame(minWidth: 360)
                        .foregroundColor(.white)
                        .background(.blue)
                        .clipShape(Rectangle())
                        .cornerRadius(10)
                    } else {
                        ProgressView()
                    }
                })
            }
            .background(Color("scooperGreen"))
            
            Button {
                Task(priority: .high) {
                    self.studentID = try await vm.getStudent(id: login.uuid ?? "")
                }
                isPresented = true
            } label: {
                Text("Check in")
            }
            .font(.headline)
            .frame(height: 55)
            .frame(minWidth: 360)
            .foregroundColor(.white)
            .background(Color("scooperGreen"))
            .clipShape(Rectangle())
            .cornerRadius(10)
        }
        .fullScreenCover(isPresented: $showSignInView, content: {
            NavigationStack {
                LoginView(showSignInView: $showSignInView)
            }
        })
        .onChange(of: isPresented, {
            login.loadCurrentUser()
            isShowingStatus.toggle()
        })
        .onAppear(perform: {
            login.loadCurrentUser()
            authUser = try? LoginManager.instance.getAuthenticatedUser()
            showSignInView = authUser == nil
            Task(priority: .high) {
                self.studentID = try await vm.getStudent(id: login.uuid ?? "")
                MapViewModel.parent = studentID
            }
        })
        .onDisappear(perform: {
            login.loadCurrentUser()
        })
        .onReceive(location.$hasArrived, perform: { _ in
            if location.hasArrived {
                Task {
                    try await vm.sendArrivalNotification(name: vm.scooper)
                }
            }
        })
    }
}

#Preview {
    ContentView()
}
