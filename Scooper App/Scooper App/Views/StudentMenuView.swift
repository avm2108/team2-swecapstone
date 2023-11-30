//
//  StudentMenuView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/28/23.
//

import SwiftUI

struct StudentMenuView: View {
    var body: some View {
        ZStack {
            Color("scooperGreen")
                .ignoresSafeArea()
            
            VStack(alignment: .leading) {
                Spacer()
                
                NavigationLink {
                        StudentProfileView()
                } label: {
                    VStack {
                        HStack {
                            Image(systemName: "person.crop.circle")
                                .resizable()
                                .frame(width: 40, height: 40)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("View")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                .padding(.leading)
                
                NavigationLink {
                    StudentDetails()
                } label: {
                    VStack {
                        HStack(spacing: 10) {
                            Image(systemName: "person.crop.circle.badge.plus")
                                .resizable()
                                .frame(width: 50, height: 40)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("Add")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                
                NavigationLink {
                        StudentRemovalView()
                } label: {
                    VStack {
                        HStack {
                            Image(systemName: "person.crop.circle.badge.minus")
                                .resizable()
                                .frame(width: 50, height: 40)
                                .foregroundStyle(Color("scooperYellow"))
                            Text("Remove")
                                .font(.title.bold())
                                .foregroundStyle(Color.white)
                        }
                    }
                }
                
                Spacer()
            }
            .padding(.leading)
        }
    }
}

#Preview {
    StudentMenuView()
}
