//
//  MenuView.swift
//  Scooper
//
//  Created by Ryheem Heard on 11/20/23.
//

import SwiftUI

struct MenuView: View {
    
    @State var info: [Student]
    
    var body: some View {
        ZStack {
            Color("scooperGreen")
                .ignoresSafeArea()
            
            
            VStack(spacing: 30) {
                Spacer()
                
                NavigationLink {
                    ForEach(info) { info in
                        FamilyView(guardianName: info.guardian.name, info: [info.name, info.guardian.email])
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
                    StudentSelectMenu()
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
                    //logout
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
                .padding()
            }
        }
    }
}

#Preview {
    MenuView(info: [Student(id: "", name: "", birth: "", address: Address(address: "", city: "", state: "", zipCode: "", type: ""), scooper: "", status: false, position: 0, grade: "", guardian: Parent(email: "", name: "", phone: "", relation: "", vehicle: Vehicle(color: "", year: "", model: "", make: "", licensePlate: "")))])
}
