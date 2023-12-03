//
//  Menu.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/16/23.
//

import SwiftUI

struct Menu: View {
    var body: some View {
        
        ZStack {
            Color("scooperGreen")
                .ignoresSafeArea()
            
            
            VStack(spacing: 30) {
                Spacer()
                
                NavigationLink {
                    StudentDetails()
                } label: {
                    VStack {
                        HStack(spacing: 20) {
                            Image(systemName: "person.fill.badge.plus")
                                .resizable()
                                .frame(width: 40, height: 40)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("Add Student")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                
                NavigationLink {
                    SchedulingView()
                } label: {
                    VStack {
                        HStack(spacing: 20) {
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
    Menu()
}
