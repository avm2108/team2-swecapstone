//
//  SchedulingView.swift
//  Scooper
//
//  Created by Ryheem Heard on 11/21/23.
//

import SwiftUI

struct SchedulingView: View {
    @State private var date = Date()
    @State private var text = ""
    @State private var selection: String?
    @State var id = String()
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @State private var isPresented = false
    @State var scoopDate: String = ""
    @State var scoopTime: String = ""
    @State var student: String?
    
    var body: some View {
        ZStack {
            Color.gray.opacity(0.1)
                .ignoresSafeArea()
            
            VStack {
                Text("Schedule Scoop Up")
                    .font(.largeTitle.bold())
                    .padding(.top)
                
                ScrollView(.vertical) {
                    VStack {
                        VStack(alignment: .leading) {
                            DatePicker("Schedule Scoop Up", selection: $date, displayedComponents: [.date, .hourAndMinute])
                                .datePickerStyle(.graphical)
                                .padding(.bottom)
                            
                            Spacer()
                            
                            
                            Text("Notes:")
                                .padding(.leading)
                                .fontWeight(.bold)
                            
                            TextEditor(text: $text)
                                .lineSpacing(5)
                                .multilineTextAlignment(.leading)
                                .cornerRadius(20)
                                .textFieldStyle(.roundedBorder)
                                .frame(height: 200)
                                .padding()
                            
                        }
                        
                        Button {
                            isPresented = true
                            Task {
                                do {
                                    try await vm.getScoopTeam(id: "5NlmPhRjYs34QVz22Avs")
                                } catch {
                                    print(error)
                                }
                            }
                            let dateFormatter = DateFormatter()
                            dateFormatter.dateStyle = .short
                            scoopDate = dateFormatter.string(from: self.date)
                            dateFormatter.dateStyle = .none
                            dateFormatter.timeStyle = .short
                            scoopTime = dateFormatter.string(from: self.date)
                        } label: {
                            Text("Select Scooper")
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
                }
                
                Button {
                    let dateFormatter = DateFormatter()
                    dateFormatter.dateStyle = .short
                    scoopDate = dateFormatter.string(from: self.date)
                    dateFormatter.dateStyle = .none
                    dateFormatter.timeStyle = .short
                    scoopTime = dateFormatter.string(from: self.date)
                    Task {
                        try await vm.sendScheduleScoopUpNotification(name: "Deborah Williams")
                        try await vm.scoopRequest(date: scoopDate, time: scoopTime, note: text, student: student ?? "")
                    }
                } label: {
                    Text("Request")
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
            .fullScreenCover(isPresented: $isPresented, content: {
                
                Text("Scoop Team")
                    .font(.largeTitle.bold())
                    .foregroundStyle(.scooperGreen)
                
                NavigationStack {
                    List {
                        ForEach(vm.scoopTeam) { scooper in
                            ForEach(scooper.team) { team in
                                NavigationLink {
                                    ScoopTeamProfileView(id: self.id, name: team.name, relation: team.relation, phone: team.phone, vehicle: team.vehicle, scoopInfo: [scoopDate, scoopTime, self.text])
                                } label: {
                                    HStack {
                                        Circle()
                                            .frame(width: 40, height: 40)
                                            .foregroundStyle(Color.blue)
                                        VStack(alignment: .leading) {
                                            HStack {
                                                Text(team.name)
                                                    .font(.headline)
                                            }
                                            Text(team.relation)
                                                .font(.subheadline)
                                                .foregroundStyle(Color.gray.opacity(0.4))
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                Spacer()
                
                Button {
                    isPresented = false
                } label: {
                    Text("Back")
                }
                .font(.headline)
                .frame(height: 55)
                .frame(minWidth: 360)
                .foregroundColor(.white)
                .background(.blue)
                .clipShape(Rectangle())
                .cornerRadius(10)
                .padding()
            })
        }
    }
}

#Preview {
    SchedulingView()
}
