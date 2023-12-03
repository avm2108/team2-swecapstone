//
//  ContentView.swift
//  Scooper
//
//  Created by Ryheem Heard on 11/19/23.
//

import SwiftUI

struct ContentView: View {
    @State private var isPresented = false
    @StateObject private var location: MapViewModel = MapViewModel()
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    
    var body: some View {
        NavigationStack {
            ZStack(alignment: .topLeading) {
                MapView()
                
                NavigationLink {
                    MenuView(info: vm.students)
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
                .fullScreenCover(isPresented: $isPresented, content: {
                    ScrollView(.vertical) {
                        VStack {
                            ForEach(vm.students) { student in
                                
                                Text(student.guardian.name)
                                    .font(.largeTitle.bold())
                                
                                AsyncImage(url: URL(string: "https://barcodeapi.org/api/qr/https://us-central1-scooper-df18f.cloudfunctions.net/student/\(student.id)"))
                                
                                Text("Code:")
                                    .font(.title)
                                    .fontWeight(.heavy)
                                
                                Text(student.guardian.key ?? "")
                                    .font(.system(size: 80, weight: .semibold))
                                    .fontWeight(.semibold)
                                    .padding(30)
                                    .frame(width: 350, height: 100, alignment: .center)
                                    .foregroundColor(.gray)
                                
                                Text("Family Status")
                                    .font(.title.bold())
                                    .foregroundStyle(.blue)
                                
                                ScrollView(.horizontal) {
                                    ZStack {
                                        Circle()
                                            .foregroundColor(Color("scooperGreen").opacity(0.3))
                                            .frame(width: 180, height: 180)
                                        Circle()
                                            .foregroundColor(Color("scooperGreen"))
                                            .frame(width: 160, height: 170)
                                        Text(student.name.first?.description ?? "")
                                            .font(.system(size: 80).bold())
                                            .foregroundStyle(Color.white)
                                    }
                                    Text(student.name)
                                        .font(.title3.bold())
                                        .foregroundStyle(Color.black)
                                    
                                    if(student.status) {
                                        Text("Releasing...")
                                            .foregroundStyle(.gray.opacity(0.7))
                                    } else {
                                        Text("Released")
                                            .foregroundStyle(.gray.opacity(0.7))
                                    }
                                }
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
                })
            }
            .background(Color("scooperGreen"))
            
            Button {
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
        .onAppear(perform: {
            Task {
                    try await vm.getStudent(id: "5NlmPhRjYs34QVz22Avs")
            }
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
