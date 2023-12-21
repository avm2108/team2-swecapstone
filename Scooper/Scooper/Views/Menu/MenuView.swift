//
//  MenuView.swift
//  Scooper
//
//  Created by Ryheem Heard on 11/20/23.
//

import SwiftUI
import FirebaseAuth

struct MenuView: View {
    
    @State var info: [Student]
    @Binding var showSignInView: Bool
    @StateObject private var vm = LoginViewModel()
    @State var id: String
//    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ZStack {
            Color("scooperGreen")
                .ignoresSafeArea()
            
            
            VStack(spacing: 30) {
                
                ZStack {
                    Circle()
                        .frame(width: 150)
                        .foregroundStyle(.blue)
                    if let user = vm.user {
                        Text(user.displayName?.first?.description ?? "")
                            .foregroundStyle(.white)
                            .font(.system(size: 80).bold())
                    }
                }
                
                if let name = vm.user {
                    Text(name.displayName ?? "")
                        .foregroundStyle(.scooperDarkGreen)
                        .font(.largeTitle.bold())
                        .padding(.bottom)
                }
                                
                NavigationLink {
                    ForEach(info) { info in
                        FamilyView(guardianName: info.guardian.name, info: [info.name, info.guardian.email, info.guardian.phone, info.guardian.vehicle.licensePlate, info.guardian.vehicle.make, info.guardian.vehicle.model, info.guardian.vehicle.year, info.guardian.vehicle.color, info.guardian.relation])
                    }
                } label: {
                    VStack {
                        HStack {
                            Image(systemName: "person.fill.badge.plus")
                                .resizable()
                                .frame(width: 40, height: 40)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("Family")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                
                NavigationLink {
                    SchedulingMenuView(id: id)
                } label: {
                    VStack {
                        HStack {
                            Image(systemName: "calendar.badge.clock")
                                .resizable()
                                .frame(width: 50, height: 40)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("Scheduling")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                .padding(.trailing)
                
                Spacer()
                
                Button {
                    do {
                        try LoginManager.instance.signOut()
//                        dismiss.callAsFunction()
                    } catch {
                        print(error)
                    }
                    showSignInView = true
                } label: {
                    Text("Logout")
                }
                .font(.headline)
                .frame(height: 55)
                .frame(minWidth: 360)
                .foregroundColor(.white)
                .background(.red)
                .clipShape(Rectangle())
                .cornerRadius(10)
            }
            .padding()
        }
        .onAppear {
            vm.loadCurrentUser()
        }
        .onChange(of: vm.user) {
            vm.loadCurrentUser()
        }
    }

}

#Preview {
    MenuView(info: [Student(id: "", name: "", birth: "", address: Address(address: "", city: "", state: "", zipCode: "", type: ""), scooper: "", status: false, position: 0, grade: "", guardian: Parent(email: "", name: "", phone: "", relation: "", vehicle: Vehicle(color: "", year: "", model: "", make: "", licensePlate: "")))], showSignInView: .constant(false), id: "863F4E258FA3")
}
