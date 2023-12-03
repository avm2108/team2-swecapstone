//
//  ContentView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 9/14/23.
//

import SwiftUI
import MapKit
import JavaScriptCore
import Foundation


struct ContentView: View {
    @State private var grade: String = ""
    @State private var isPresented: Bool = false
    @State private var showAlert = false
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    
    var body: some View {
        NavigationStack {
            VStack {
                
                ZStack(alignment: .topLeading) {
                    MapView()
                    
                    
                    NavigationLink {
                        Menu()
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
                                .foregroundStyle(.blue)
                        }
                        .padding()
                    }
                }
                
                Spacer()
                
                ScrollView(.horizontal) {
                    
                    HStack {
                        ForEach(vm.user ?? [User(id: "", phone: "", name: "", email: "")]) { item in
                            NavigationLink {
                                ParentView(info: User(id: item.id, phone: item.phone, name: item.name, email: item.email))
                            } label: {
                                VStack {
                                    ZStack {
                                        Circle()
                                            .foregroundColor(.gray.opacity(0.2))
                                            .frame(width: 180, height: 180)
                                        Circle()
                                            .foregroundColor(.white)
                                            .frame(width: 160, height: 170)
                                        Text(item.name.first?.description ?? "")
                                            .font(.system(size: 80).bold())
                                            .foregroundStyle(Color.blue)
                                    }
                                    
                                    Text(item.name)
                                        .font(.title3.bold())
                                        .foregroundStyle(Color.gray)
                                }
                            }
                        }
                    }
                }
                .padding()
                
                
                Button {
                    isPresented = true
                } label: {
                    Text("Dashboard")
                }
                .font(.headline)
                .frame(height: 55)
                .frame(minWidth: 360)
                .foregroundColor(.white)
                .background(Color("scooperGreen"))
                .clipShape(Rectangle())
                .cornerRadius(10)
                .padding()
            }
            .alert(isPresented: $showAlert) {
                Alert(
                    title: Text("Check In Status"),
                    message: Text("You're currently checked in.")
                )
            }
            .background(Color("scooperYellow"))
            .fullScreenCover(isPresented: $isPresented, content: {
                NavigationView {
                    List(content: {
                        
//                        ACTIVE STUDENTS
                        ForEach(vm.students ?? [Student(id: "", name: "", birth: "", address: Address(id: "", address: "", city: "", state: "", zipCode: "", type: ""), scooper: "", status: false, position: 1000, grade: "", guardian: Parent(id: "", email: "", name: "", phone: "", relation: "", vehicle: Vehicle(id: "", color: "", year: "", model: "", make: "", licensePlate: "")))]) { student in
                            if (student.status && student.scooper != "BUS") {
                                NavigationLink {
                                    Dismissal(grade: student.grade, name: student.name, id: student.id)
                                } label: {
                                    HStack {
                                        Circle()
                                            .frame(width: 40, height: 40)
                                            .foregroundStyle(Color.blue)
                                        VStack(alignment: .leading) {
                                            HStack {
                                                Text(student.name )
                                                    .font(.headline)
                                                Circle()
                                                    .frame(width: 5, height: 5)
                                                    .foregroundStyle(Color.green)
                                            }
                                            Text(student.scooper )
                                                .font(.subheadline)
                                                .foregroundStyle(Color.gray.opacity(0.4))
                                        }
                                        Spacer()
                                        Text(student.position.description)
                                            .font(.title2.bold())
                                    }
                                }
                            }
                        }
                        
                        
                        
//                        INACTIVE STUDENTS
                        Section {
                            ForEach(vm.students ?? [Student(id: "", name: "", birth: "", address: Address(address: "", city: "", state: "", zipCode: "", type: ""), scooper: "", status: false, position: 1000, grade: "", guardian: Parent(email: "", name: "", phone: "", relation: "", vehicle: Vehicle(color: "", year: "", model: "", make: "", licensePlate: "")))]) { student in
                                if (!student.status) {
                                    NavigationLink {
                                        Dismissal(grade: student.grade , name: student.name, id: student.id)
                                    } label: {
                                        HStack {
                                            Circle()
                                                .frame(width: 40, height: 40)
                                                .foregroundStyle(Color.blue)
                                            VStack(alignment: .leading) {
                                                HStack {
                                                    Text(student.name )
                                                        .font(.headline)
                                                    Circle()
                                                        .frame(width: 5, height: 5)
                                                        .foregroundStyle(Color.red)
                                                }
                                                Text(student.scooper)
                                                    .font(.subheadline)
                                                    .foregroundStyle(Color.gray.opacity(0.4))
                                            }
                                            Spacer()
                                            Text(student.position.description)
                                                .font(.title2.bold())
                                        }
                                    }
                                }
                            }
                        } header: {
                            Text("Inactive")
                        }
                        
//                        BUS RIDERS
                        Section {
                            ForEach(vm.students ?? [Student(id: "", name: "", birth: "", address: Address(id: "", address: "", city: "", state: "", zipCode: "", type: ""), scooper: "", status: false, position: 1000, grade: "", guardian: Parent(id: "", email: "", name: "", phone: "", relation: "", vehicle: Vehicle(id: "", color: "", year: "", model: "", make: "", licensePlate: "")))]) { student in
                                if (student.scooper == "BUS") {
                                    NavigationLink {
                                        Dismissal(grade: student.grade , name: student.name , id: student.id)
                                    } label: {
                                        HStack {
                                            Circle()
                                                .frame(width: 40, height: 40)
                                                .foregroundStyle(Color.blue)
                                            VStack(alignment: .leading) {
                                                HStack {
                                                    Text(student.name)
                                                        .font(.headline)
                                                    Circle()
                                                        .frame(width: 5, height: 5)
                                                        .foregroundStyle(Color.green)
                                                }
                                                Text(student.scooper)
                                                    .font(.subheadline)
                                                    .foregroundStyle(Color.gray.opacity(0.4))
                                            }
                                            Spacer()
                                            Text("B")
                                                .font(.title.bold())
                                                .foregroundStyle(Color.blue)
                                        }
                                    }
                                }
                            }
                        } header: {
                            Text("Bus")
                        }
                    })
                    .navigationTitle(Text("Dismissal"))
                }
                Spacer()
                
                VStack {
                    Button {
                        isPresented = false
                    } label: {
                        Text("Home")
                    }
                    .font(.headline)
                    .frame(height: 55)
                    .frame(minWidth: 360)
                    .foregroundColor(.white)
                    .background(Color("scooperGreen"))
                    .clipShape(Rectangle())
                    .cornerRadius(10)
                    .padding()
                }
            })
            .onAppear {
                Task(priority: .high) {
                    try await vm.getStudents()
                }
            }
        }
        .environmentObject(vm)
        .onAppear {
            vm.getUser()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
