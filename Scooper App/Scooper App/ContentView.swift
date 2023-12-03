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
    @StateObject private var notificationManager: NotificationManager = NotificationManager()
    
    var body: some View {
        NavigationStack {
            VStack {
                
//                  HAMBURGER MENU
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
                
//               PARENTS QUEUE
                ScrollView(.horizontal) {
                    
                    HStack {
                        ForEach(vm.students.sorted()) { item in
                            NavigationLink {
                                ParentView(info: Vehicle(color: item.guardian.vehicle.color, year: item.guardian.vehicle.year, model: item.guardian.vehicle.model, make: item.guardian.vehicle.make, licensePlate: item.guardian.vehicle.licensePlate), id: item.id, guardianName: item.guardian.name)
                            } label: {
                                if (item.scooper != "BUS" && item.position != 1000) {
                                    VStack {
                                        ZStack {
                                            Circle()
                                                .foregroundColor(.gray.opacity(0.2))
                                                .frame(width: 180, height: 180)
                                            Circle()
                                                .foregroundColor(.white)
                                                .frame(width: 160, height: 170)
                                            Text(item.scooper.first?.description ?? "")
                                                .font(.system(size: 80).bold())
                                                .foregroundStyle(Color.blue)
                                        }
                                        Text(item.scooper)
                                            .font(.title3.bold())
                                            .foregroundStyle(Color.gray)
                                        
                                        Text("P:\(item.position)")
                                            .font(.title.bold())
                                        
                                    }
                                }
                            }
                        }
                    }
                }
                .padding()
                
                
                Button {
                    Task(priority: .high) {
                        try await vm.getStudents()
                    }
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
            .background(Color("scooperYellow"))
            .fullScreenCover(isPresented: $isPresented, content: {
                NavigationStack {
                    List(content: {
                        
    //                        ACTIVE STUDENTS
                        ForEach(vm.students.sorted()) { student in
                            if ((student.scooper != "BUS" && student.status) && student.position != 1000) {
                                NavigationLink {
                                    Dismissal(grade: student.grade, name: student.name, id: student.id)
                                        .onDisappear {
                                            Task(priority: .high) {
                                                try await vm.getStudents()
                                            }
                                        }
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
                            } else if (student.scooper != "BUS" && student.status) {
                                NavigationLink {
                                    Dismissal(grade: student.grade, name: student.name, id: student.id)
                                        .onDisappear {
                                            Task(priority: .high) {
                                                try await vm.getStudents()
                                            }
                                        }
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
                                    }
                                }
                            }
                        }
                        
                        
                        
    //                        INACTIVE STUDENTS
                        Section {
                            ForEach(vm.students) { student in
                                if (!student.status) {
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
                                    }
                                }
                            }
                        } header: {
                            Text("Inactive")
                        }
                        
    //                        BUS RIDERS
                        Section {
                            ForEach(vm.students) { student in
                                if (student.scooper == "BUS" && student.status) {
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
        }
        .onReceive(vm.$students, perform: { newValue in
            Task {
                try await vm.getStudents()
            }
        })
        .onAppear(perform: {
            Task {
//                try await vm.getStudents()
                await notificationManager.getStatus()
                await notificationManager.requestPermissions()
            }
        })
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
